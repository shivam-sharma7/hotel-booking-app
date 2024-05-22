import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotelList from "./pages/MyHotelList";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import HotelDetail from "./pages/HotelDetail";
import Booking from "./pages/Booking";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layouts>
              <p>Home Page</p>
            </Layouts>
          }
        />

        <Route
          path="/search"
          element={
            <Layouts>
              <Search />
             </Layouts>
          }
        />
         <Route
          path="/detail/:hotelId"
          element={
            <Layouts>
              <HotelDetail />
             </Layouts>
          }
        />
        <Route
          path="/register"
          element={
            <Layouts>
              <Register />
            </Layouts>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Layouts>
              <SignIn />
            </Layouts>
          }
        />
        {isLoggedIn && (
          <>
          <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layouts>
                  <Booking />
                </Layouts>
              }
            />
            <Route
              path="/add-hotels"
              element={
                <Layouts>
                  <AddHotel />
                </Layouts>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layouts>
                  <MyHotelList />
                </Layouts>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layouts>
                  <EditHotel />
                </Layouts>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
