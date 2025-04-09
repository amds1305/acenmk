
function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SectionsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/estimation" element={<ProjectEstimation />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin/*" element={<Admin />} />
                
              </Routes>
              <Toaster />
            </BrowserRouter>
          </SectionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
