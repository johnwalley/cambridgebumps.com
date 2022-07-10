export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate("/latest/town/men");
    await res.revalidate("/latest/town/women");
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
