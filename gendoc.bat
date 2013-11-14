@ECHO OFF
REM -- Generate jsDoc documentation
REM -- Requires Node.js and JSDoc
REM -- Install using: npm install -g jsdoc

jsdoc -c .\src\jsdoc\conf.json %*
