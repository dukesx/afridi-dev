import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export default async function generatePlaceholder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cover } = req.body;
    const { base64 } = await getPlaiceholder(
      `https://ik.imagekit.io/afrididotdev/tr:w-400${cover}`
    );
    return res.status(200).json({
      placeholder: base64,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}
