/**
 * @file
 * Project Script
*/

var pwbam = function() {
	var charsets = {
		uc	: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lc 	: 'abcdefghijklmnopqrstuvwxyz',
		n	: '0123456789',
		s	: '@%+!#$^?:.(){}[]~-_'
	}
	var possible = ['uc', 'lc', 'n', 's'];
	var length = 16;
	return {
		start : function() {
			// set pw initially
			pwbam.genPW();
			// apply behavior to password input
			passwordInput = document.getElementById('password');
			copyTooltip = document.getElementById('copy-directions');
			pwbam.addEvent(passwordInput, 'focus', function(e){
				this.select();
				pwbam.addClass(copyTooltip, 'show');
			});
			pwbam.addEvent(passwordInput, 'blur', function(e){
				pwbam.removeClass(copyTooltip, 'show');
			});
			// apply behaviors to reset button
			refreshButton = document.getElementById('reset');
			pwbam.addEvent(refreshButton, 'click', function(e){
				pwbam.genPW();
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
				return false;
			});
			// apply behavior to form inputs
			formEls = document.querySelectorAll('input:not(#password)');
			for (i=0; i<formEls.length; i++) {
				pwbam.addEvent(formEls[i], 'change', function(e) {
					pwbam.genPW();
				});
			}
		},
		getPossibleChars : function() {
			// empty char string to be appended later
			var chars = '';
			// get chars checkboxes
			var charsInputs = document.querySelectorAll('input[name="chars"]:checked');
			// make sure some are checked (if none are, all will be used)
			if (charsInputs.length > 0) {
				// empty out possible so it can be rebuilt
				possible = [];
				// loop through checkboxes to get values
				for (i=0; i<charsInputs.length; i++) {
					possible.push(charsInputs[i].value);
				}
			} else {
				possible = ['uc', 'lc', 'n', 's'];
			}
			// user values from checkboxes to build char string
			for (i=0; i<possible.length; i++) {
				chars+=charsets[possible[i]];
			}
			// return string of characters
			return chars;
		},
		genPW : function() {
			var pw = "";
			var chars = pwbam.getPossibleChars();
			length = document.querySelector('input[name="length"]').value;
			for (i=0; i<length; i++) {
				pw += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			document.getElementById('password').value = pw;
		},
		addClass : function(el, className) {
			if (el.classList) {
				el.classList.add(className);
			} else {
				el.className += ' ' + className;
			}
		},
		removeClass : function(el, className) {
			if (el.classList) {
				el.classList.remove(className);
			} else {
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		},
		addEvent : function(obj, evType, fn) {
			if (obj.addEventListener){ 
				obj.addEventListener(evType, fn, false); 
			} else if (obj.attachEvent){ 
				var r = obj.attachEvent("on"+evType, fn); 
			}
		},
		domReady : function(f) {/in/.test(document.readyState)?setTimeout('pwbam.domReady('+f+')',9):f()}
	}
}();
pwbam.domReady(pwbam.start);