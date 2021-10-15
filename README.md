# Google Extension: Website Performance Checker

![Website Performance Checker](demo/performance_collector.gif)

This is a Google extension to allow you to collect performance data of websites.
The performance data is something you can check in Google Chrome Developer Tools but this tool collects the data automatically and you can see all performance data at once.

## Type of Measures

- **Page Load**: The time between the start of the fetch and the firing of the onLoad event. The time spent by JS won’t be counted as this measurement. (This name “Page Load” might lead misunderstanding.)
- **TTFB(Time to First Byte)**: The time between creating a connection to the server and downloading the contents of a web page (=> the responsiveness of a web server).

## How to use

Input target URL in the input form and browse. That's it!  
Only websites with URL starting with the URL you input.

> e.g. input “https://google.com”,
>
> - a website with “https://google.com/example/” => True
> - a website with “https://abc.google.com/example/” => > False
> - a website with “http://google.com” => False

**Export** : Download the csv file.  
**Remove all**: Remove all collected performance data and an input URL.  
**Remove current data**: Remove only data of the current access. You can use it when something wrong happened in the current access.

You need to reset caches all the time in case that you want to measure time of initial accesses.
