const router = express.Router();
const { verify } = require("../middleware/verify");

// protect all routes below
router.use(verify);

router.get("/", getAllExpenses);
router.get("/search", searchExpense);
router.get("/:id", getOneExpense);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
