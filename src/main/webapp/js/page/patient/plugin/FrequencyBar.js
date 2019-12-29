function FrequencyBar() {

    var self = this;
    self.init = function (counts, totalCount, colors) {

        var freqColors = ["lightgreen", "green"];
        if(!_.isUndefined(colors)){
            freqColors = colors;
        }
        var barColor = "#ccc";
        var textMargin = 6;
        var textWidth = 35;
        var barWidth = 30;
        var barHeight = 8;

        var mainCountIndex = 0;
        var mainProportion = counts[mainCountIndex] / totalCount;

        var textPos = (barWidth || 0) + (textMargin || 0);
        var totalWidth = textPos + (textWidth || 0);

        var freqRects = [];
        _.forEach(counts, function (count, index) {
            var colorIdx = index % freqColors.length;
            var color = colorIdx >= 0 ? freqColors[colorIdx] : freqColors[0];
            // console.log('color is ' , color);
            freqRects.push(frequencyRectangle(count, totalCount, color, barWidth, barHeight));
            // console.log('freqRect is ', freqRects);
        });

        var txt = '';
        txt += ' <svg style="width:100%;" width='+totalWidth+' height="12">\n' +
            '                <text\n' +
            '                    x=' + textPos + ' \n' +
            '                    y="9.5"\n' +
            '                    textAnchor="start"\n' +
            '                    fontSize="10"\n' +
            '                    >\n';
        txt += getPercentage(mainProportion) +' \n';
        txt += '          </text>\n' +
            '                <rect\n' +
            '                    y="2"\n' +
            '                    width=" ' + barWidth + ' "\n' +
            '                    height=" ' + barHeight + ' "\n' +
            '                    fill=" ' + barColor + ' "\n' +
            '                />\n';
              for(var i=0;i<freqRects.length;i++) {
                  txt +=freqRects[i] + ' \n';
              }
            txt+='            </svg>';
        // console.log('freqRect',txt);
        return txt;
    }


    var frequencyRectangle = function (count, totalCount, color, barWidth, barHeight) {
        var proportion = count / totalCount;
        var width = proportion * (barWidth || 0);
        var txt = '';
        txt += '<rect \n' +
            '        y="2" \n' +
            '        width=" ' + width + ' "\n' +
            '        height=" ' + barHeight + ' "\n' +
            '        fill="' + color + '"\n' +
            '        />'
        return txt;
    }

    function getPercentage(proportion) {
        var digits = 1;
        return toFixedWithThreshold(100 * proportion, digits) + '%';
    }

    function toFixedWithThreshold(value, digits) {
        var fixed = value.toFixed(digits);

        // if we end up with 0.0...0, returns <0.0...1 instead
        if (value !== 0 && parseFloat(fixed) === 0) {
            var floatingZeros = digits > 1 ? _.fill(Array(digits - 1), "0") : [];

            // in case the value is negative, direction of the inequality changes
            // (because, for example, 0.02 < 0.1 but, -0.02 > -0.1)
            // we need to add the minus sign as well...
            var prefix = value > 0 ? "<" : ">-";

            fixed = prefix + '0.' + floatingZeros.join('') + '1';
        }

        return fixed;
    }

}
