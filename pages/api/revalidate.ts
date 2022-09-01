// pages/api/revalidate.js

import {
  withApiAuth,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

export default withApiAuth(async function ProtectedRoute(req, res) {
  const { path } = req.body;
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(path);
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({
      revalidated: false,
      message: "Error revalidating",
    });
  }
});
