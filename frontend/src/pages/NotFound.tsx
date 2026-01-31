import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Decorative generic math symbol or big 404 */}
      <h1 className="text-9xl font-bold text-primary/20 select-none">404</h1>
      
      <div className="space-y-4 -mt-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Variable Not Found
        </h2>
        
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The page you are looking for seems to have been subtracted from the equation. 
          Please double-check your coordinates.
        </p>

        <div className="pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Return to MathHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;