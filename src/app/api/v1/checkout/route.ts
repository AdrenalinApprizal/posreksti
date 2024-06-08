import { prisma } from "@/app/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, cart } = await request.json();
    console.log("Received data:", { userId, cart });

    // Validate userId and cart
    if (!userId || !Array.isArray(cart) || cart.length === 0) {
      throw new Error("Invalid userId or cart");
    }

    const totalPrice = cart.reduce(
      (sum, product) => sum + product.price * (product.quantity || 1),
      0
    );

    console.log("Total price calculated:", totalPrice);

    const checkoutPromises = cart.map(async (product) => {
      try {
        await prisma.checkout.create({
          data: {
            totalPrice,
            userId,
            productId: product.id,
          },
        });
        console.log(`Checkout record created for product ${product.id}`);
      } catch (error) {
        console.error(`Error creating checkout record for product ${product.id}:`, error);
        // Optionally handle individual checkout errors
      }
    });

    await Promise.all(checkoutPromises);

    console.log("All checkout records created");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error during checkout:", error);
    return NextResponse.json(
      { error: error.message || "Error during checkout" },
      { status: 500 }
    );
  }
}
