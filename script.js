let app=new Vue({
    el: "#app",
    data: {
        categories: [],
        topMovies: {},
        selectedCategory : '',
        getID: null,
        titles: null,
        myArray: null,
        showVote: false,
        buttonsPressed: false,
    },
    mounted() {
        this.getAllCategories()
        localStorage.clear()
    },
    methods: {
        showFinalVote(){
            this.showVote = true
            this.buttonsPressed = false
            localStorage.setItem('Tableau',this.myArray)
        },
        buttonsPressedShow(){
            this.buttonsPressed = true
            this.showVote = false
        },
        buttonsPressedHide(){
            this.buttonsPressed = false;
            localStorage.clear()
        },
        getAllCategories() {
            let url = 'https://api.themoviedb.org/3/genre/movie/list'
            axios
                .get(url, {
                    params: {
                        api_key: 'f522d1761ce5c8b992310946f193b1fa'
                    }
                })
                .then(response => {
                    this.categories = response.data.genres;
                    this.getTopMovies()
                })
        },
        getTopMovies() {
            for (const category of this.categories) {
                const url = 'https://api.themoviedb.org/3/discover/movie';
                axios.get(url, {
                    params: {
                        api_key: 'f522d1761ce5c8b992310946f193b1fa',
                        with_genres: this.getID,
                        sort_by: 'vote_count.desc',
                        language: 'fr-FR',
                        include_adult: false,
                    }
                }).then(response => {
                    this.$set(this.topMovies, category.id, response.data.results.slice(0, 10));
                    this.titles = app.topMovies[this.getID].map((x) => x.title);
                    this.myArray = this.titles;
                    localStorage.setItem('Tableau',this.myArray);
                });
            }
        },
        updateSelectedCategoryId() {
            this.getID = this.selectedCategory
            const selectedCategoryObject = this.categories.find(category => category.name === this.getID);
            if (selectedCategoryObject) {
                this.getID = selectedCategoryObject.id;
            };
            this.topMovies = {},
            this.titles = [],
            this.getTopMovies()
        }
        
    }
})


