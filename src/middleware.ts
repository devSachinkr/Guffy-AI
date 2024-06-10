import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware(
    {
        publicRoutes: ["/", "/auth(.*)","portal(.*)","/blogs(.*)"],
        ignoredRoutes: ["/chatbot"],
    }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};