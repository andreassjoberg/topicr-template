# topicr-template

This is a template for building web sites, pre-setup with `.NET core`, `Entity Framework` (SQL Server), `React`, `Redux`, `Webpack`, `Babel`, `Eslint` etc.

## Get it running
To automate webpack when working in Visual Studio, install extension `Webpack Task Runner`.  
  
You also need to add the `aspnetcidev` NuGet repository: `https://dotnet.myget.org/F/aspnetcore-ci-dev/api/v3/index.json`
  
To install packages:
```
    npm install
    dotnet restore
```

To run:
```
    dotnet run
```
or use IISExpress in Visual Studio.