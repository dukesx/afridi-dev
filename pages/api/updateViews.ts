// pages/api/revalidate.js

import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

export default async function ProtectedRoute(req, res) {
  const { views, id } = req.body;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const { error } = await supabase
    .from("articles")
    .update({
      views: views + 1,
    })
    .match({
      id: id,
    });

  if (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  } else {
    return res.json({
      success: true,
    });
  }
}
