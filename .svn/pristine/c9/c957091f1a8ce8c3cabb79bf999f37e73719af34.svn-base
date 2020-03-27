import { Headers, RequestOptions } from '@angular/http';
import { sessionData } from '../pages/shared/session-data'

export class setting {


    
    public static APP_NAME: string = "Oreo";
    public static APP_UI_NAME: string = "Qatar Sales";
    public static version = "1.0";
    // public static DOMAIN_URL="http://localhost:8080/Oreo";
    public static DOMAIN_URL="http://api.e-techdistribution.com/api/";

    public static AuthoriztionTKN='Bearer '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE1MzE3NDY5MzUsImV4cCI6MTUzMTc1MDUzNSwibmJmIjoxNTMxNzQ2OTM1LCJqdGkiOiJjVjZSeVRTS3VjR3NYZjRpIiwic3ViIjozLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.1jVBki8aRBmgDeWCLpL9XithZVYFuUYGxM6tGyfqqkg';

    static getHeaderJson(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Authorization', setting.AuthoriztionTKN);

        return contentHeaders;
    }

    static getHeaderJsonFormData(): Headers {
        let contentHeaders = new Headers();
        // contentHeaders.append('Content-Type', 'application/json');
        // contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Authorization', setting.AuthoriztionTKN);

        return contentHeaders;
    }


    static getHeaderJsonGetMethod(): Headers {
        let contentHeaders = new Headers();
        // contentHeaders.append('Content-Type', 'application/json');
        // contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Authorization', setting.AuthoriztionTKN);
        contentHeaders.append('UserAuth', 'Bearer '+sessionData.userToken);

        return contentHeaders;
    }

    static getHeaderJsonGetMethod2(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('Authorization', setting.AuthoriztionTKN);
        contentHeaders.append('UserAuth', 'Bearer '+sessionData.userToken);

        return contentHeaders;
    }


    static getHeaderJsonWithTKN(): Headers {

        let contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('Authorization', setting.AuthoriztionTKN);

        contentHeaders.append('UserAuth','Bearer '+ sessionData.userToken);
        return contentHeaders;
    }

    static getHeaderXWFORM(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        return contentHeaders;
    }

    static getHeaderJsonWithTKNImgeUpload(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        // contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;
    }

    static getHeaderXWFORMWithTkn(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        // contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;
    }

    static getHeaderTKN(): Headers {
        let contentHeaders = new Headers();
        // contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;

    }

}