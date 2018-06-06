// https://hao.360.cn/
(function(){
    var calendar = {
        init: function (opt) {
            this.solarCalendarDate = opt.solarCalendarDate;
            this.weekDate = opt.weekDate;
            this.lunarCalendarDate = opt.lunarCalendarDate;
            this.whiteList = opt.whiteList;
            this.solarTopicText = this.getTopicText(this.solarCalendarDate);
            this.lunarTopicText = this.getTopicText(this.lunarCalendarDate);
            this.topicText = this.lunarTopicText || this.solarTopicText;
            this.topicTextUrl = this.getUrl(this.topicText);
            this.render();
        },
        render: function () {
            var html = this.getHtml();
            hao360.docWrite(html);
        },
        getHtml: function () {
            var htmlTpl = [
                '<a href="http://hao.360.cn/rili">',
                    this.solarCalendarDate + this.weekDate,
                '</a>',
                '<div>',
                    '<a href="' + this.topicTextUrl + '">',
                        this.topicText && this.topicText[0] || this.lunarCalendarDate,
                    '</a>',
                '</div>'
            ];
            return htmlTpl.join('');
        },
        getTopicText: function (date) {
            return this.whiteList[date];
        },
        getUrl: function (text) {
            var url = text ? 'http://k.hao.360.cn/t/' + text : 'http://hao.360.cn/rili';
            url = text && text[1] ? text[1] : url;
            return url;
        }
    }

    var e = hao360.todayObj,
        solarCalendarDate = [e.getMonth() + 1, "\u6708", e.getDate(), "\u65e5"].join(""),
        weekDate = ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d"][e.getDay()],
        lunarCalendarDate = hao360.lunar(e);

    var whiteList = {
        '正月初一': ['春节'],
        '正月十五': ['元宵节'],
        '五月初五': ['端午节'],
        '七月初七': ['七夕'],
        '九月初九': ['重阳节'],
        '腊月初八': ['腊八节'],
        '1月1日': ['元旦'],
        '2月14日': ['情人节'],
        '3月8日': ['三八妇女节'],
        '5月1日': ['五一劳动节'],
        '6月1日': ['六一儿童节'],
        '9月10日': ['教师节'],
        '10月1日': ['国庆节'],
        '12月24日': ['平安夜'],
        '12月25日': ['圣诞节']
    };
    calendar.init({
        solarCalendarDate: solarCalendarDate,
        weekDate: weekDate,
        lunarCalendarDate: lunarCalendarDate,
        whiteList: qboot.mix(specialFestivalConf || {}, whiteList)
    });
})();
