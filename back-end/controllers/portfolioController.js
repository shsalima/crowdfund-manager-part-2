import Investment from "../models/investment.js"; // Import dyal investment schema jdid dyalk

export const getInvestorPortfolio = async (req, res) => {
  try {
    const investorId = req.user.user._id;

    // 1. Fetchi l-investments dyal had l-investor o jib m3ahom l-data dyal l-project
    const investments = await Investment.find({ investor: investorId })
      .populate("project", "title status capital") // N-populate-iw ghir ach 7tajna mn project
      .sort({ createdAt: -1 }); // N-rتبوهم mn l-jdid l-qdym

    // 2. Mappa l-data exact match m3a chnou bghiti f l-front
    const portfolio = investments
      .filter(inv => inv.project != null) // Anti-crash ila l-project t-deleta mn l-database
      .map((inv) => {
        return {
          investmentId: inv._id,
          projectId: inv.project._id,
          title: inv.project.title,
          status: inv.project.status,
          montantInvesti: inv.amount,
          pourcentageDetenu: inv.percentage || ((inv.amount / inv.project.capital) * 100).toFixed(2),
          dateParticipation: inv.createdAt
        };
      });

    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};