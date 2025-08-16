import { NextResponse } from "next/server";

// To handle a GET request to /api/users
export async function GET(request: Request) {
    // In a real app, you would fetch data from a database
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
    ];

    return NextResponse.json(users, { status: 200 });
}

// To handle a POST request to /api/users
export async function POST(request: Request) {
    const data = await request.json();
    // Here you would typically add the new data to your database
    console.log(data);

    return NextResponse.json(
        { message: "User created successfully", user: data },
        { status: 201 },
    );
}
