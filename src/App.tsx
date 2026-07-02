import {
    Navigate,
    Route,
    Routes,
} from 'react-router'
import AppLayout from './components/layout/AppLayout'
import CategoriesPage from './pages/CategoriesPage'
import HomePage from './pages/HomePage'

function App() {
    return (
        // Keep the shared header and footer around every page.
        <AppLayout>
            {/* Match browser URLs with application pages. */}
            <Routes>
                {/* Render the home page at the root URL. */}
                <Route
                    path="/"
                    element={<HomePage />}
                />

                {/* Render the category list page. */}
                <Route
                    path="/categories"
                    element={<CategoriesPage />}
                />

                {/* Redirect unknown URLs back to the home page. */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />
            </Routes>
        </AppLayout>
    )
}

export default App