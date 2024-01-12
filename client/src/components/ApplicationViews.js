import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { Home } from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { UserProfileList } from "./UserProfileList";
import { UserProfileDetails } from "./UserProfileDetails";
import { ChoresList } from "./ChoresList";
import { ChoreDetails } from "./ChoreDetails";
import { CreateChore } from "./auth/CreateChore";




export const ApplicationViews = ({ loggedInUser, setLoggedInUser }) => {
    return (
        <Routes>

            <Route path="/">

                <Route
                    index
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            <Home />
                        </AuthorizedRoute>
                    }
                />
            {/* //============================================================================================== */}
                <Route path="/userprofiles">
                    <Route
                        index
                        element={
                            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                                <UserProfileList loggedInUser={loggedInUser} />
                            </AuthorizedRoute>
                        }
                    />

                    <Route
                        path=":id"
                        element={
                            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                                <UserProfileDetails />
                            </AuthorizedRoute>
                        }
                    />
                </Route>


            {/* //============================================================================================== */}

                <Route path="/chores">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser}>
                                <ChoresList loggedInUser={loggedInUser} />
                            </AuthorizedRoute>
                        }
                    />

                    <Route
                        path=":id"
                        element={
                            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                                <ChoreDetails />
                            </AuthorizedRoute>
                        }
                    />

                </Route>

            {/* //============================================================================================== */}

                <Route
                    path="login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                />

                <Route
                    path="register"
                    element={<Register setLoggedInUser={setLoggedInUser} />}
                />
            </Route>

            {/* //============================================================================================== */}


            <Route
                path="/createchore"
                element={
                    <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                        <CreateChore />
                    </AuthorizedRoute>
                }
            />

            {/* //============================================================================================== */}

            <Route path="*" element={<p>Whoops, nothing here...</p>} />

            {/* //============================================================================================== */}

            

        </Routes>
    );
};
