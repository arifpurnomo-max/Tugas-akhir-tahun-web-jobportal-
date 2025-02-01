// Mock API endpoint handler
function handleJobsAPI(method, params = {}) {
    // Sample job data (in a real application, this would come from a database)
    const jobs = [
        {id: 1, title: "Guru Bahasa Arab", company: "Arabic Foundation", location: "Jakarta", salary: "Rp 3-5 juta", type: "Full-time"},
        {id: 2, title: "Translator", company: "Translateaja!", location: "Bandung", salary: "Rp 8-10 juta", type: "Full-time"},
        {id: 3, title: "Konsultan Syariah", company: "Consulting Group", location: "Jakarta", salary: "Rp 12-18 juta", type: "Full-time"},
        {id: 4, title: "Motivator Islami", company: "Islamy Corp", location: "Surabaya", salary: "Rp 8-12 juta", type: "Part-time"},
        {id: 5, title: "Qari", company: "Nahawand Group", location: "Jakarta", salary: "Rp 6-9 juta", type: "Part-time"},
        {id: 6, title: "Designer Busana Muslim", company: "Innovation Boutique", location: "Bandung", salary: "Rp 4-6 juta", type: "Online"},
        {id: 7, title: "Pemandu Wisata Religi", company: "Guide Solutions", location: "Jakarta", salary: "Rp 4-7 juta", type: "Full-time"},
        {id: 8, title: "Guru Tahsin dan Tahfidz", company: "Abata Foundation", location: "Surabaya", salary: "Rp 3-4 juta", type: "Part-time"},
        {id: 9, title: "Penulis dan Editor Konten Islami", company: "Nailul Project", location: "Jakarta", salary: "Rp 4-6 juta", type: "Online"}
    ];

    // Return a promise to mimic AJAX behavior
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (method === 'GET') {
                    const keyword = (params.keyword || '').toLowerCase();
                    const location = params.location || '';
                    const type = params.type || '';

                    // Filter jobs based on parameters
                    const filteredJobs = jobs.filter(job => {
                        const matchKeyword = !keyword || 
                            job.title.toLowerCase().includes(keyword) || 
                            job.company.toLowerCase().includes(keyword);
                        
                        const matchLocation = !location || 
                            job.location === location;
                        
                        const matchType = !type || 
                            job.type === type;
                        
                        return matchKeyword && matchLocation && matchType;
                    });

                    resolve(filteredJobs);
                } else {
                    reject(new Error('Method not supported'));
                }
            } catch (error) {
                reject(error);
            }
        }, 100); // Small delay to simulate network request
    });
}

// Replace XMLHttpRequest/Fetch with our mock API
$.ajax = function(options) {
    const params = options.data || {};
    
    handleJobsAPI(options.method, params)
        .then(response => {
            if (options.success) options.success(response);
        })
        .catch(error => {
            if (options.error) options.error(null, 'error', error);
        });
};
