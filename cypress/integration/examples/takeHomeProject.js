describe('it covers the four automated scenarios given', function() {
    beforeEach(() => {
        cy.visit('http://the-internet.herokuapp.com/dynamic_content')
    });

    it('makes sure duplicate images are not displayed', function() {
        cy.get('.large-2>img').then(function ($list) {
            expect($list[0].currentSrc).to.not.equal($list[1].currentSrc)
            expect($list[0].currentSrc).to.not.equal($list[2].currentSrc)
            expect($list[1].currentSrc).to.not.equal($list[2].currentSrc)
        })
    });

    //not working
    it('makes sure the longest lorem ipsum word is not duplicated', function() {
        cy.get('.large-10:first').should(($div) => {
            const text = $div.text()
            const theWord = findLongestWord(text);
    
            function findLongestWord(text){
                var str = text.split(' ');
                var longest = 0;
                var word = '';
                var counting = 0;
                str.forEach(function(str) {
                    if (longest < str.length) {
                        longest = str.length;
                        word = str;
                        if (word == str) {
                            counting++
                        }
                        console.log(counting);
                        return counting
                    }
                    
                })
                return { word, counting};
            }
        console.log(findLongestWord(text));
        expect(theWord).to.exist
        })
    });

    // not working
    it('makes sure the Wolverine image doesn\'t have magni lorem ipsum text', function() {
        cy.get('.large-2>img').then(function ($list) {
            if ($list[0].currentSrc == '/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg' || $list[1].currentSrc == '/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg' || $list[2].currentSrc == '/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg') {
                cy.get('.large-10:first').should(($div) => {
                    const text = $div.text()
                    expect(text).to.not.equal('magni')
                }
            }
        })
    });

    //not working
    it('refreshes the page up to 5 times in search of 3 mario images', function() {
        cy.get('.large-2>img').should(($list) => {
            let marioCount = 0
            let refreshCount = 0
            while(marioCount < 3 || refreshCount <= 6) {
                const picCheck = Cypres.$('/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg')
                // oof, doesn't check all if one is true
                if($list[0].currentSrc == '/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg') {
                    marioCount = marioCount++
                } else if ($list[1].currentSrc == '/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg') {
                    marioCount = marioCount++
                } else if ($list[2].currentSrc == '/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg') {
                    marioCount = marioCount++
                } else {
                    refreshCount = refreshCount++
                    cy.reload()
                }

            }
            expect(marioCount).to.be(3)
        })\
    });
});