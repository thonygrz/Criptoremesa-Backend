import Router from "express-promise-router";
import usersController from "./controllers/users.controller";
import guard from "../../utils/guard";
const usersRouter = Router();

// IF YOU WERE USING cg/auth/login
usersRouter.get(
  "/getAll",
  // guard.verifyAdmin("/login"),
  usersController.getusers
);

usersRouter.get(
  "/getAllClients",
  // guard.verifyAdmin("/login"),
  usersController.getusersClient
);

usersRouter.post(
  "/create",
  // guard.verifyAdmin("/login"),
  usersController.createUser
);

usersRouter.post(
  "/createClient",
  // guard.verifyAdmin("/login"),
  usersController.createUserClient
);

usersRouter.post(
  "/createNewClient",
  // guard.verifyAdmin("/login"),
  usersController.createNewClient
);

usersRouter.put(
  "/updateClient",
  // guard.verifyAdmin("/login"),
  usersController.updateUserClient
);

usersRouter.put(
  "/updateEmployee",
  // guard.verifyAdmin("/login"),
  usersController.updateUserEmployee
);

usersRouter.get(
  "/getClientById/:id",
  // guard.verifyAdmin("/login"),
  usersController.getusersClientById
);

usersRouter.get(
  "/getEmployeeById/:id",
  // guard.verifyAdmin("/login"),
  usersController.getusersEmployeeById
);

usersRouter.get(
  "/getEmployeePhonesById/:id",
  // guard.verifyAdmin("/login"),
  usersController.getEmployeePhonesById
);

usersRouter.get(
  "/getClientPhonesById/:id",
  // guard.verifyAdmin("/login"),
  usersController.getClientPhonesById
);

usersRouter.get(
  "/getDepartmentsByUserId/:id",
  // guard.verifyAdmin("/login"),
  usersController.getDepartmentsByUserId
);

usersRouter.delete(
  "/blockClient/:id",
  // guard.verifyAdmin("/login"),
  usersController.blockClient
);

usersRouter.delete(
  "/blockEmployee/:id",
  // guard.verifyAdmin("/login"),
  usersController.blockEmployee
);

usersRouter.delete(
  "/unblockClient/:id",
  // guard.verifyAdmin("/login"),
  usersController.unblockClient
);

usersRouter.delete(
  "/unblockEmployee/:id",
  // guard.verifyAdmin("/login"),
  usersController.unblockEmployee
);

usersRouter.get(
  "/getDataFromSheetsClients",
  // guard.verifyAdmin("/login"),
  usersController.getDataFromSheetsClients
);

usersRouter.get(
  "/getDataFromSheetsEmployees",
  // guard.verifyAdmin("/login"),
  usersController.getDataFromSheetsEmployees
);

usersRouter.get(
  "/approveLevelCero/:id",
  // guard.verifyAdmin("/login"),
  usersController.approveLevelCero
);



usersRouter.post(
  "/files",
  // guard.verifyAdmin("/login"),
  usersController.files
);

usersRouter.post(
  "/requestLevelOne1stQ",
  // guard.verifyAdmin("/login"),
  usersController.requestLevelOne1stQ
);

usersRouter.post(
  "/requestLevelOne2ndQ",
  // guard.verifyAdmin("/login"),
  usersController.requestLevelOne2ndQ
);

usersRouter.post(
  "/requestLevelOne3rdQ",
  // guard.verifyAdmin("/login"),
  usersController.requestLevelOne3rdQ
);

usersRouter.post(
  "/forgotPassword",
  // guard.verifyAdmin("/login"),
  usersController.forgotPassword
);

export default usersRouter;
