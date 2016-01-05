
var ucb = function(){
    //A Flying Text Effect
    var _this = this;
    this.letterTransition = 50;

    /**
     * Add span element with each letter wrapped in another span
     * @param element
     * @param className
     */
    this.pushSpan = function(element,className){
        var string = element._text;
        var stringArr = string.split('');
        var spanAppear = document.createElement('span');
        spanAppear.className = className;
        for(var j in stringArr){
            var letterSpan = document.createElement('span');
            letterSpan.textContent = stringArr[j];
            spanAppear.appendChild(letterSpan);
        }
        element.appendChild(spanAppear);
        return element;
    }
    /**
     * Change element with text with element with single-span element
     * @param element
     * @returns {Node}
     */
    this.changeToElementWithSingleSpan = function(element){
        var newEl = element.cloneNode(true);
        newEl._text = newEl.textContent;
        newEl.textContent = '';
        _this.pushSpan(newEl,'s-trans');
        element
            .parentElement
            .replaceChild(newEl,element);
        console.log('yep');
        return newEl;
    };
    /**
     * Change element with two spans
     * @param element
     * @returns {Node}
     */
    this.changeToElementWithToggleableSpans = function(element){
        var newEl = element.cloneNode(true);
        newEl._text = newEl.textContent;
        newEl.textContent = '';
        _this.pushSpan(newEl,'s-ap');
         _this.pushSpan(newEl,'s-ds');
        element
            .parentElement
            .replaceChild(newEl,element);
        return newEl;
    };
    /**
     * Initilize togglers and their event listeners
     * @type {function(this:ucb)}
     */
    this.togglers = function(){
        var letterCasted = document.querySelectorAll('.ucb.ucb-toggle');
        for(var i=0;i<letterCasted.length;i++){
            var	el = _this.changeToElementWithToggleableSpans(letterCasted[i]);
            el.addEventListener('mouseenter',function(e){
                var el = e.target;
                var appearClass = 'a-'+el.dataset.appear;
                var dissapearClass = 'd-'+el.dataset.dissapear;
                el.leaveInterval&&clearTimeout(el.leaveInterval);
                //adding classes
                var spanAppearLetters = el
                    .getElementsByClassName('s-ap')[0]
                    .getElementsByTagName('span');
                var spanDissapearLetters = el
                    .getElementsByClassName('s-ds')[0]
                    .getElementsByTagName('span');
                //interval
                var counter = 0;
                el.enterInterval = setInterval(function(){
                    var currentAppear = spanAppearLetters.item(counter);
                    currentAppear.className = appearClass;
                    var currentDissapear = spanDissapearLetters.item(counter);
                    currentDissapear.className = dissapearClass;
                    counter++;
                    if(counter===spanAppearLetters.length){
                        clearTimeout(el.enterInterval);
                    }
                },_this.letterTransition)
            });
            el.addEventListener('mouseleave',function(e){
                var el = e.target;
                var appearClass = 'a-'+el.dataset.appear;
                var dissapearClass = 'd-'+el.dataset.dissapear;
                clearTimeout(el.enterInterval);
                var spanAppearLetters = el
                    .getElementsByClassName('s-ap')[0]
                    .getElementsByClassName(appearClass);
                var spanDissapearLetters = el
                    .getElementsByClassName('s-ds')[0]
                    .getElementsByClassName(dissapearClass);
                var counter = spanAppearLetters.length-1;
                    el.leaveInterval = setInterval(function(){
                       if(currentAppear = spanAppearLetters.item(counter))
                            currentAppear.className = '';
                        if(currentDissapear = spanDissapearLetters.item(counter))
                            currentDissapear.className = '';
                        counter--;
                        if(counter<0){
                            clearTimeout(el.leaveInterval);
                        }
                    },_this.letterTransition);


            });
        }
    }.bind(this);

    this.singlers = function(){
        var letterCasted = document.querySelectorAll('.ucb.ucb-single');
        for(var i=0;i<letterCasted.length;i++){
            var	el = _this.changeToElementWithSingleSpan(letterCasted[i]);
            el.addEventListener('mouseenter',function(e){
                var el = e.target;
                el.leaveInterval&&clearInterval(el.leaveInterval);
                var changeClass = 'c-'+el.dataset.change;
                var spanAppearLetters = el
                    .getElementsByClassName('s-trans')[0]
                    .getElementsByTagName('span');
                var counter = 0;
                el.enterInterval = setInterval(function(){
                    var currentAppear = spanAppearLetters.item(counter);
                    currentAppear.className = changeClass;
                    counter++;
                    if(counter===spanAppearLetters.length){
                        clearTimeout(el.enterInterval);
                    }
                },_this.letterTransition)
            })

            el.addEventListener('mouseleave',function(e){
                var el = e.target;
                el.enterInterval&&clearInterval(el.enterInterval);
                var changeClass = 'c-'+el.dataset.change;
                var spanChangeLetters = el
                    .getElementsByClassName('s-trans')[0]
                    .getElementsByClassName(changeClass);
                var counter =  spanChangeLetters.length-1;
                el.leaveInterval = setInterval(function(){
                    if(currentChange = spanChangeLetters.item(counter))
                        currentChange.className = '';
                    counter--;
                    if(counter<0){
                        clearTimeout(el.leaveInterval);
                    }
                },_this.letterTransition)
            })
        }
    }

    this.togglers();
    this.singlers();
}
var Ucb = new ucb();