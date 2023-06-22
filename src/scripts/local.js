console.log(document.referrer)

function init(){
    $('.menu').on('click',function(){
        $('.hero--bar-right-menu').toggleClass("open")
    })

    $('.menu, a, .experiences--block-learnmore').on('mouseover',function() {
        $('.cursor').addClass('is-active')
    });
    $('.menu, a, .experiences--block-learnmore').on('mouseleave',function() {
        $('.cursor').removeClass('is-active')
    });

    $('.home--touch a, .menu.opened, .hero--bar-logo, .experiences--block-learnmore').on('mouseover',function() {
        $('.cursor').addClass('is-active-white')
    });
    $('.home--touch a, .menu.opened, .hero--bar-logo,  .experiences--block-learnmore').on('mouseleave',function() {
        $('.cursor').removeClass('is-active-white')
    });
        
    
    function cursor() {
        const cursor = $('.cursor')[0];
        document.addEventListener('mousemove', e => {
        cursor.setAttribute('style', 'top:' + (e.clientY) + 'px;' + 'left:' + (e.clientX) + 'px;')
        });
    }

    cursor();

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".home--content", {
        y: 30,
        opacity: 0       
    })

    gsap.set(".hero--face", {
        opacity: 0
    })

    gsap.set(".hero--bar-logo", {
        opacity: 1
    })

    if($('.home').length){
        var tl = gsap.timeline();
        tl.from(".hero--bar-logo", 1.5,{
            opacity: 0,
            ease: Linear.easeNone,
            delay: 1,
            onComplete: function(){
                $('.hero--bar-logo').removeClass('big');
                gsap.to(".home--content", {
                    y: 0,
                    opacity: 1,
                    duration: 1.5 ,
                    delay: 1
                });
                gsap.to(".hero--face", {
                    opacity: 1,
                    duration: 1.5,
                    delay: 1.2
                })   
                        
            }
        })
    }

    

    // let blocks = $('.timeline--block')
    gsap.utils.toArray('.timeline--block').forEach(function(block){
        gsap.set(block, { 
            opacity: 0,
            x: 20
        });
        gsap.to(block, {
            scrollTrigger: {
                trigger: block,
                // markers: true,
                scrub: 1,
                start: "top 60%",
                end: "bottom bottom"
            },
            opacity: 1,
            x:0
        })
    })

    $('.experiences--block').on('mouseenter', function(){
        console.log("mouse in")
        let block = $(this);
        setTimeout(function(){
            block.find('.experiences--block-learnmore').addClass('opened');
        }, 400)
    })
    $('.experiences--block').on('mouseleave', function(){
        $('.experiences--block-learnmore').removeClass('opened');
    })

    gsap.set('.experiences--block-description .data', {
        opacity: 0,
        display:'none'
    })

    $('.experiences--block-learnmore').on('click', function(){
        let descBlock = $(this).siblings('.experiences--block-description');
        let dataBlock = descBlock.find('.data')
        $(this).find('.open').toggleClass('d-none')
        $(this).find('.shut').toggleClass('d-none')
        if(descBlock.hasClass('opened')){
            gsap.to(dataBlock, {
                delay: 0.4,
                opacity: 0,
                display:'none',
                onComplete: function(){
                    descBlock.toggleClass('opened')
                }
            })
        }
        else{
            descBlock.toggleClass('opened')
            gsap.to(dataBlock, {
                delay: 0.4,
                opacity: 1,
                display:'block',
            })
        }
        
    })

    gsap.utils.toArray('.skills--group').forEach(function(block){
        gsap.set(block, { 
            opacity: 0,
            y: 20
        });
        gsap.to(block, {
            scrollTrigger: {
                trigger: block,
                // markers: true,
                scrub: 1,
                start: "top 70%",
                end: "bottom bottom"
            },
            opacity: 1,
            y:0
        })
    })


    gsap.utils.toArray('.projects--row').forEach(function(block){
        gsap.set(block, { 
            opacity: 0,
            y: 20
        });
        gsap.to(block, {
            scrollTrigger: {
                trigger: block,
                // markers: true,
                scrub: 1,
                start: "top 70%",
                end: "bottom bottom"
            },
            opacity: 1,
            y:0
        })
    })






    $('svg.radial-progress').each(function( index, value ) {
        $(this).find($('circle.complete')).removeAttr('style');
    });

    $(window).scroll(function(){
        $('svg.radial-progress').each(function( index, value ) {
        // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
        if (
            $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
            $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
        ) {
            // Get percentage of progress
            var percent, radius, circumference, strokeDashOffset;
            percent = $(value).data('percentage');
            // Get radius of the svg's circle.complete
            radius = $(this).find($('circle.complete')).attr('r');
            // Get circumference (2πr)
            circumference = 2 * Math.PI * radius;
            // Get stroke-dashoffset value based on the percentage of the circumference
            strokeDashOffset = circumference - ((percent * circumference) / 100);
            // Transition progress for 1.25 seconds
            $(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
        }
        });
    }).trigger('scroll');
        
    $('.bendtext.first, .bendtext.third').arctext({
        radius: 110
    });
    $('.bendtext.second').arctext({
        radius: 90
    });
    $('.bendtext.fourth').arctext({
        radius: 50
    });
}

init();

const swup = new Swup({
    containers: ["#swup"],
    cache: false,
    animationSelector: '[class*="transition-"]',
    linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
});


swup.on('contentReplaced', () => {
    init();
});

