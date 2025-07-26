import { useAsync } from "./useAsync";
import * as sanityService from "@/services/sanityService";
import type { QueryParams } from "@/types/queryParams";
import { useState, useCallback } from "react";

// Create a proper cache key based on params
const createCacheKey = (baseKey: string, params?: QueryParams) => {
  if (!params) return baseKey;
  return `${baseKey}-${JSON.stringify(params)}`;
};

export function useImpactStats() {
  const cacheKey = "impactStats";
  return useAsync(() => sanityService.fetchImpactStats(), cacheKey);
}

export function useTeamMembers() {
  const cacheKey = "teamMembers";
  return useAsync(() => sanityService.fetchTeamMembers(), cacheKey);
}

export function useServices() {
  const cacheKey = "services";
  return useAsync(() => sanityService.fetchServices(), cacheKey);
}
export function useBio() {
  const cacheKey = "bio";
  return useAsync(() => sanityService.fetchBio(), cacheKey);
}

export function useTestimonials() {
  const cacheKey = "testimonials";
  return useAsync(() => sanityService.fetchTestimonials(), cacheKey);
}

export function useClients() {
  const cacheKey = "clients";
  return useAsync(() => sanityService.fetchClients(), cacheKey);
}

// Enhanced hook for insights with pagination, search, and filtering
export function useInsights(params?: QueryParams) {
  const [queryParams, setQueryParams] = useState<QueryParams>(
    params || {
      limit: 10,
      offset: 0,
      sort: { field: "publishedAt", direction: "desc" },
    }
  );

  const cacheKey = createCacheKey("insights", queryParams);
  const result = useAsync(
    () => sanityService.fetchInsights(queryParams),
    cacheKey
  );

  // Function to update query parameters
  const updateParams = useCallback((newParams: Partial<QueryParams>) => {
    setQueryParams((prev) => ({
      ...prev,
      ...newParams,
      // Reset offset to 0 when filters or sort changes
      offset:
        newParams.filters || newParams.sort
          ? 0
          : newParams.offset || prev.offset,
    }));
  }, []);

  // Pagination helpers
  const nextPage = useCallback(() => {
    if (
      result.data &&
      (queryParams.offset || 0) + (queryParams.limit || 10) < result.data.total
    ) {
      updateParams({
        offset: (queryParams.offset || 0) + (queryParams.limit || 10),
      });
    }
  }, [queryParams, result.data, updateParams]);

  const prevPage = useCallback(() => {
    if ((queryParams.offset || 0) > 0) {
      updateParams({
        offset: Math.max(
          0,
          (queryParams.offset || 0) - (queryParams.limit || 10)
        ),
      });
    }
  }, [queryParams, updateParams]);

  // Search helper
  const search = useCallback(
    (searchTerm: string) => {
      updateParams({
        filters: {
          ...queryParams.filters,
          search: searchTerm,
        },
      });
    },
    [queryParams.filters, updateParams]
  );

  // Filter by category helper
  const filterByCategory = useCallback(
    (category: string) => {
      updateParams({
        filters: {
          ...queryParams.filters,
          category,
        },
      });
    },
    [queryParams.filters, updateParams]
  );

  // Sort helper
  const sortBy = useCallback(
    (field: string, direction: "asc" | "desc") => {
      updateParams({
        sort: { field, direction },
      });
    },
    [updateParams]
  );

  return {
    ...result,
    queryParams,
    updateParams,
    nextPage,
    prevPage,
    search,
    filterByCategory,
    sortBy,
    currentPage:
      Math.floor((queryParams.offset || 0) / (queryParams.limit || 10)) + 1,
    totalPages: result.data
      ? Math.ceil(result.data.total / (queryParams.limit || 10))
      : 0,
  };
}

// Hook for single insight with related posts
export function useInsightBySlug(slug: string) {
  const cacheKey = `insight-${slug}`;
  return useAsync(() => sanityService.fetchInsightBySlug(slug), cacheKey);
}

// Hook for categories with count
export function useCategories() {
  const cacheKey = "categories";
  return useAsync(() => sanityService.fetchCategories(), cacheKey);
}

// Hook for authors with count
export function useAuthors() {
  const cacheKey = "authors";
  return useAsync(() => sanityService.fetchAuthors(), cacheKey);
}
