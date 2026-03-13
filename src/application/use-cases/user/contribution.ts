import { Contribution } from "@/domain/entities";
import { contributionService } from "@/infrastructure/services/contributionService";

export async function newContribution(contribution: Contribution) {
  try {
    const { error } = await contributionService.createContribution(contribution);

    if (error) {
      console.error("Contribution creation error:", error.message);
      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;

      if (status) {
        switch (status) {
          case "23505":
          case "23505":
            return {
              success: false,
              error: "A contribution with similar details already exists.",
            };
          case "42501":
          case "42501":
            return {
              success: false,
              error: "You don't have permission to create a contribution.",
            };
          case 400:
            return {
              success: false,
              error: "Invalid data. Please check your text fields.",
            };
          case 401:
            return { success: false, error: "Unauthorized. Please try again." };
          case 403:
            return {
              success: false,
              error:
                "Access forbidden. Contact support if this issue persists.",
            };

          case 500:
            return {
              success: false,
              error: `Internal server error: ${errorMessage}`,
            };

          default:
            return { success: false, error: errorMessage };
        }
      } else {
        return { success: false, error: errorMessage };
      }
    } else {
      return { success: true, error: null };
    }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "An error occurred during contribution creation. Please try again.",
    };
  }
}
