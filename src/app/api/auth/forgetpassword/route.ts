import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required and must be a valid string." },
        { status: 400 }
      );
    }

    // Make the API call to reset the password
    const response = await axios.post(
      "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
      { email }
    );

    // Return the response from the backend API
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return NextResponse.json(
        { error: axiosError.response?.data?.message || "Failed to send reset password email." },
        { status: axiosError.response?.status || 500 }
      );
    }

    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
