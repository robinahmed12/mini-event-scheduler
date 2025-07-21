function categorizeEvent(title = "", notes = "") {
  const text = `${title} ${notes}`.toLowerCase();

  const workKeywords = ["meeting", "project", "client"];
  const personalKeywords = ["birthday", "family", "anniversary"];

  if (workKeywords.some((kw) => text.includes(kw))) return "Work";
  if (personalKeywords.some((kw) => text.includes(kw))) return "Personal";

  return "Other";
}

module.exports = categorizeEvent;
