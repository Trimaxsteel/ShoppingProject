import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ieikkehqqaaythpfssif.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaWtrZWhxcWFheXRocGZzc2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDE0NTksImV4cCI6MjA2MzgxNzQ1OX0.5Xk6WcoLXAjBuMRSWLx1coYLoq3v1f9_ecTLeKZFczQ"
);
