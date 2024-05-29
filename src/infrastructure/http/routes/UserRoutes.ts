import { Router } from "express";
import { UserController } from "./../controllers/userController";

const router = Router();
const userController = new UserController();
router.get("/", (req, res)=>res.json({msg:"hello world"}))
router.post("/users", (req, res) => userController.create(req, res));
router.get("/users/:id", (req, res)=> userController.findById(req, res))
router.get("/users", (req, res)=>userController.findAll(req, res))
router.post("/login",(req,res)=>userController.login(req,res))
export { router as userRoutes };
