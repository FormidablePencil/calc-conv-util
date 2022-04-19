# calc-conv-util

Hello,
The first step in the interview process is to take the below attached technical test. Any questions please let me know.
Thanks!
This project is contrived, but a good example of the things we need to do in every day.

You can GET this URL: https://100insure.com/mi/api1.php
It will return a json like this: {"key1":"fifteen","key2":"five"}
Where fifteen and five are random numbers between 1 and 99 inclusive.

Then take that output, process the words into numbers, and POST it to this URL with a mathematical operation: https://100insure.com/mi/api2.php as a json in this format:
{
"num1":15,
"num2":5,
"operation":"plus"
}
Where operation can be one of:
'plus'
'minus'
'times'
'divided by'

Here's a sample post using curl:
curl -v --header "Content-Type: application/json" --request POST --data '{"num1":3,"num2":5,"operation":"times"}' https://100insure.com/mi/api2.php

That will output the result. So 15+5 would send back 20
Display the results for each of the 4 operations: +, -, *, and ÷ in a nice UI.
