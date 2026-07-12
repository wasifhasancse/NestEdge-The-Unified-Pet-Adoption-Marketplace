import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // Check "user" collection first (better-auth default), fallback to "users"
    let userDoc = await db.collection("user").findOne({ email });
    if (!userDoc) {
      userDoc = await db.collection("users").findOne({ email });
    }

    if (!userDoc) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Strip sensitive fields
    const { password, ...safeUser } = userDoc;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("Error in GET /api/profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const body = await req.json();

    const {
      name,
      image,
      phoneNumber,
      location,
      bio,
      experience,
      facebook,
      instagram,
    } = body;

    const updateFields = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateFields.name = name;
    if (image !== undefined) updateFields.image = image;
    if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
    if (location !== undefined) updateFields.location = location;
    if (bio !== undefined) updateFields.bio = bio;
    if (experience !== undefined) updateFields.experience = experience;
    if (facebook !== undefined) updateFields.facebook = facebook;
    if (instagram !== undefined) updateFields.instagram = instagram;

    // Try updating in "user" collection first
    let result = await db
      .collection("user")
      .updateOne({ email }, { $set: updateFields });

    // If no document matched, try "users"
    if (result.matchedCount === 0) {
      result = await db
        .collection("users")
        .updateOne({ email }, { $set: updateFields });
    }

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "User not found to update" },
        { status: 404 }
      );
    }

    // Fetch the updated profile to return
    let updatedUserDoc = await db.collection("user").findOne({ email });
    if (!updatedUserDoc) {
      updatedUserDoc = await db.collection("users").findOne({ email });
    }

    const { password, ...safeUser } = updatedUserDoc;

    return NextResponse.json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error in PUT /api/profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
