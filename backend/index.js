import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import companiesRoutes from "./src/routes/companies.js";
import usersRoutes from "./src/routes/users.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
