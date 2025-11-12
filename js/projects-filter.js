// ================================
// Projects Filter JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-full');

    if (filterButtons.length === 0 || projectCards.length === 0) {
        return; // Exit if not on projects page
    }

    // ================================
    // Filter Functionality
    // ================================
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.style.display = 'grid';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                } else {
                    // Hide card
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ================================
    // Project Counter
    // ================================
    function updateProjectCount() {
        const visibleProjects = document.querySelectorAll('.project-card-full[style*="display: grid"], .project-card-full:not([style*="display"])');
        const countDisplay = document.querySelector('.project-count');
        
        if (countDisplay) {
            countDisplay.textContent = `Exibindo ${visibleProjects.length} projeto(s)`;
        }
    }

    // Initial count
    updateProjectCount();

    // Update count on filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(updateProjectCount, 400);
        });
    });

    // ================================
    // Project Search Functionality
    // ================================
    const searchInput = document.querySelector('.project-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                
                const matches = title.includes(searchTerm) || 
                               description.includes(searchTerm) || 
                               tags.includes(searchTerm);
                
                if (matches) {
                    card.style.display = 'grid';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            updateProjectCount();
        });
    }

    // ================================
    // Sort Projects
    // ================================
    const sortSelect = document.querySelector('.project-sort');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const projectsContainer = document.querySelector('.projects-grid-full');
            const cardsArray = Array.from(projectCards);
            
            let sortedCards;
            
            switch(sortValue) {
                case 'date-desc':
                    sortedCards = cardsArray.sort((a, b) => {
                        const dateA = new Date(a.querySelector('.detail-item:nth-child(2)').textContent.split(': ')[1]);
                        const dateB = new Date(b.querySelector('.detail-item:nth-child(2)').textContent.split(': ')[1]);
                        return dateB - dateA;
                    });
                    break;
                case 'date-asc':
                    sortedCards = cardsArray.sort((a, b) => {
                        const dateA = new Date(a.querySelector('.detail-item:nth-child(2)').textContent.split(': ')[1]);
                        const dateB = new Date(b.querySelector('.detail-item:nth-child(2)').textContent.split(': ')[1]);
                        return dateA - dateB;
                    });
                    break;
                case 'name-asc':
                    sortedCards = cardsArray.sort((a, b) => {
                        const nameA = a.querySelector('h3').textContent.toLowerCase();
                        const nameB = b.querySelector('h3').textContent.toLowerCase();
                        return nameA.localeCompare(nameB);
                    });
                    break;
                case 'name-desc':
                    sortedCards = cardsArray.sort((a, b) => {
                        const nameA = a.querySelector('h3').textContent.toLowerCase();
                        const nameB = b.querySelector('h3').textContent.toLowerCase();
                        return nameB.localeCompare(nameA);
                    });
                    break;
                default:
                    sortedCards = cardsArray;
            }
            
            // Re-append sorted cards
            sortedCards.forEach(card => {
                projectsContainer.appendChild(card);
            });
        });
    }

    // ================================
    // Project Details Modal (Optional)
    // ================================
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add modal functionality here
            console.log('Project link clicked:', this.textContent);
        });
    });

    // ================================
    // Share Project Functionality
    // ================================
    function shareProject(projectTitle, projectUrl) {
        if (navigator.share) {
            navigator.share({
                title: projectTitle,
                text: `Confira este projeto: ${projectTitle}`,
                url: projectUrl
            }).then(() => {
                console.log('Projeto compartilhado com sucesso!');
            }).catch((error) => {
                console.log('Erro ao compartilhar:', error);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(projectTitle)}&url=${encodeURIComponent(projectUrl)}`;
            window.open(shareUrl, '_blank');
        }
    }

    // ================================
    // Load More Projects (Pagination)
    // ================================
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let visibleProjects = 3;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenProjects = Array.from(projectCards).slice(visibleProjects, visibleProjects + 3);
            
            hiddenProjects.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
            
            visibleProjects += 3;
            
            if (visibleProjects >= projectCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    console.log('🎯 Projects filter loaded successfully!');
});

