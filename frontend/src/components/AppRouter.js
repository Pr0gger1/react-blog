import {useRoutes} from "react-router-dom";
import {routes} from "../router/routes";

const AppRouter = ({ isAuth }) => {
    return useRoutes(routes(isAuth));
};

export default AppRouter;