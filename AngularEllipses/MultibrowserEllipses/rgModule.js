

angular.module('rgModule',[]).directive('rgClamp', function () {
   return{
       scope:{
           rgClamp:'='
       },
       restrict:'A',
       link: function (scope, element, attrs, cntrl) {

           var elementheight = 0;
           var lineheight = 0;
           var maxlines = 0;
           var prefferedHeight = 0;
           var truncatedHeight = 0;
           var originalData = element.text();
           var truncatedData = '';
           var datachunks = [];
           var chunkno = 0;

            elementHeight();

            if(elementheight != undefined) {
                startProcess();
            }else{
                var ellipseWatch = scope.$watch(function(){
                                        return element.height() || element.maxHeight || element.clientHeight;
                                    },function(newval,oldval){
                                        if(oldval > 0 || newval > 0){
                                            ellipseWatch();
                                            elementHeight();
                                            startProcess();
                                        }
                                    });
            }


            function startProcess() {
                getLineHeight();
                getMaxLines();
                getPreferredHeight();
                //setElementHeight();
                SplitData();
                ellipsisData();
                setEllipsis();
                truncatedHeight = elementheight;
                chunkno = datachunks.length;
            }

           function setElementHeight() {
               element.css('height',prefferedHeight);
           }

           function getPreferredHeight(){
               prefferedHeight = Math.max(Math.round(scope.rgClamp * lineheight),0);
           }

           function getMaxLines() {
               maxlines = Math.max(Math.floor(elementheight/lineheight),0);
           }

           function getLineHeight() {
                lineheight = getProp('line-height');
               if(lineheight=='normal'){
                   lineheight = parseInt(getProp('font-size')) * 1.2;
               }else
               {
                   lineheight = parseInt(lineheight);
               }
           }

           function getProp(prop) {
               return element.css(prop);
           }

           function elementHeight() {
               elementheight = element.height() || element.maxHeight || element.clientHeight;
           }

           function SplitData() {
               datachunks = originalData.split(' ');
           }

           function setEllipsis(){

               /* clamping words */
               while(truncatedHeight <= prefferedHeight){
                   if(datachunks[chunkno]==undefined){
                       break;
                   }
                   var clampedtext = element.text();
                   element.text(clampedtext+' '+datachunks[chunkno]);
                   elementHeight();
                   truncatedHeight = elementheight;
                   if(truncatedHeight>prefferedHeight){
                       element.text(clampedtext);
                       break;
                   }
                   chunkno++;
               }

               /* clamping letters */
               var letterchunks = datachunks[chunkno].split('');
               var clampedtext = element.text();

               for(var j=0;j<letterchunks.length;j++){
                   element.text(clampedtext+letterchunks[j]);
                   elementHeight();
                   truncatedHeight = elementheight;
                   if(truncatedHeight>prefferedHeight){
                       element.text(element.text().substring(0,element.text().length-1));
                       break;
                   }

               }

               clampedtext = element.text();
               element.text(clampedtext.substring(0,clampedtext.length-4)+'...');

           }

           /* truncated height must be equal or less than preffered height */
           function ellipsisData() {
               truncatedHeight = elementheight;
               chunkno = datachunks.length;

                while(truncatedHeight>prefferedHeight){

                    if(prefferedHeight <= (truncatedHeight/2)){
                        chunkno = Math.max(Math.round(chunkno/2),0);
                    }else{
                        var interno = Math.max(Math.round(chunkno/2),0);
                        var interim = interno +  Math.max(Math.round(interno/2),0);
                        if(interim==chunkno){
                            chunkno = interim-1;
                        }
                        else{
                            chunkno = interim;
                        }
                    }
                    truncatedData = '';
                    for(var i=0;i<chunkno;i++){
                       truncatedData+=datachunks[i]+' ';
                    }

                    element.text(truncatedData);
                    elementHeight();
                    truncatedHeight = elementheight;
                }
           }


       }
   }
});