import express from "express";
import { validate, verferToken } from "../middlewares/authMiddleware.middleware.js";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController.controller.js";
import { createProjectValidation, isProjectOpen, isProjectOwner, onlyOwner } from "../middlewares/projectMiddleware.middleware.js";


const projectRoutes=express.Router()

projectRoutes.post("/create",verferToken,onlyOwner,createProjectValidation,createProject)

projectRoutes.get("/",verferToken,getAllProjects)
projectRoutes.get("/:id",verferToken,getProjectById)
// projectRoutes.get("/:id/details",verferToken,getProjectDetails)

projectRoutes.put("/",verferToken,isProjectOwner,isProjectOpen,updateProject)
projectRoutes.delete("/:id",verferToken,isProjectOwner,deleteProject)



export default projectRoutes