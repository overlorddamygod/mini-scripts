#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>

void error_message(char msg[]);
int total_contacts();
void showInstructions();
void update();
void delete();
void show();
void add();
void delay(int milliseconds);

struct contact {
    char name[50];
    char number[20];
};

int main() {
    int input,x;
    bool running=true;
    FILE *fp;
    fp=fopen("tel.txt","a");
    fclose(fp);
    puts("Loading");
    for(x=0;x<5;x++)
    {
        puts(".");
        delay(500);
    }
    putchar('\n');
    printf("-------------------------------\n");
    printf("***** Telephone Directory *****\n");
    printf("-------------------------------\n");
    showInstructions();
    while (running) {
        input=0;
        printf("Enter your choice : ");
        scanf("%d",&input);
        switch(input) {
            case 1:
                add();
                break;
            case 2:
                delete();
                break;
            case 3:
                show();
                break;
            case 4:
                update();
                break;
            case 5:
                showInstructions();
                break;
            case 6:
                printf("-----------------------------\n");
                printf("***** Quitting......... *****\n");
                printf("-----------------------------\n");
                running=false;
                break;
        }
    }
    return 0;
}
// ----------------------------------------------------------------
void error_message(char msg[]) {
    printf("XXXXX %s XXXXX\n",msg);
}
int total_contacts() {
    FILE *fp;
    int count=0;
    char details[50];
    fp=fopen("tel.txt","r");
    if ( fp == NULL )
    {
        printf( "Error" ) ;
    }
    else {
        while (fgets(details, 50, fp) != NULL) {
            count++;
        }
        fclose(fp) ;
        return count;
    }
    return count;
}
void showInstructions() {
    printf("--------------------\n");
    printf("1. Add a contact\n");
    printf("2. Remove a contact\n");
    printf("3. Show all contacts\n");
    printf("4. Update a contact\n");
    printf("5. Show Instructions\n");
    printf("6. Exit\n");
    printf("--------------------\n");
}
void update() {
    FILE *fp, *temp;
    int count=0,id;
    char details[50],name[50],number[11];
    struct contact c;
    printf("Enter id to update : ");
    scanf("%d", &id);
    if (id<=0 || id>=(total_contacts()+1)) {
        error_message("Please enter a valid id");
        update();
        return;
    }
    printf("Enter new name : ");
    scanf("%s",c.name);
    printf("Enter new number : ");
    scanf("%s",c.number);
    while (!(atoi(c.number) / 2)) {
        error_message("Please enter a valid Number");
        printf("Enter new Number : ");
        scanf("%s",c.number);
    }
    fp = fopen("tel.txt", "r");
    temp = fopen("tel_temp.txt", "w");
    if (fp == NULL) {
        printf("Error");
    } else {
        while (fgets(details, 50, fp) != NULL) {
            count++;

            if (count == id) {
                // Writing updated details to the file
                fprintf(temp, "%d. %s %s \n", count,c.name, c.number);
                printf("-------------------------------------------------\n");
                printf("***** Successfully Updated *****\n");
                printf("***** Name : %s | Number : %s *****\n",c.name,c.number);
                printf("-------------------------------------------------\n");
            } else {
                // Writing un-updated details to the file
                fprintf(temp, "%s",details);
            }
        }
        fclose(fp);
        fclose(temp);
        remove("tel.txt");
        rename("tel_temp.txt", "tel.txt");
    }
}
void delete() {
    char details[50],det[50];
    FILE *fp,*temp;
    int count=0,id_to_delete,found=0,temp_count=1;
    printf("Enter id to delete : ");
    scanf("%d",&id_to_delete);
    if (id_to_delete<=0 || id_to_delete>=(total_contacts()+1)) {
        error_message("Please enter a valid id");
        delete();
        return;
    }
    fp=fopen("tel.txt","r");
    temp=fopen("tel_temp.txt","w");
    if ( fp == NULL )
    {
        printf( "Error" ) ;
    }
    else {
        while (fgets(details, 50, fp) != NULL) {
            count++;
            // Writing details other than the details of provided id
            if(count!=id_to_delete) {
                for (int i=0;i<strlen(details);i++) {
                    if (details[i]=='.') {
                        found=i+2;
                        for (int j=0;j<50;j++) {
                            det[j]=details[found];
                            found++;
                        }
                        found=0;
                    }
                }
                fprintf(temp, "%d. %s", temp_count,det);
                for (int j=0;j<50;j++) {
                    det[j]=' ';
                    found++;
                }
                temp_count++;
            }
        }
        fclose(fp);
        fclose(temp);
        printf("--------------------------------\n");
        printf("***** Successfully Deleted *****\n");
        printf("--------------------------------\n");
        remove("tel.txt");
        rename("tel_temp.txt", "tel.txt");
    }
}
void show() {
    FILE *fp;
    char details[50];
    fp=fopen("tel.txt","r");
    if(total_contacts()==0) {
        printf("-----------------------------\n");
        printf("***** No Contacts Added *****\n");
        printf("-----------------------------\n");
        return;
    }
    if ( fp == NULL )
    {
        printf( "Error" ) ;
    }
    else {
        printf("--------------------------\n");
        while (fgets(details, 50, fp) != NULL) {
            printf("%s", details);
        }
        printf("--------------------------\n");
        fclose(fp) ;
    }
}
void add() {
    struct contact c;
    int total_contact=0;
    total_contact=total_contacts();
    FILE *fp;
    printf("Enter name : ");
    scanf("%s",c.name);
    printf("Enter number : ");
    scanf("%s",c.number);
    while (!(atoi(c.number) / 2)) {
        error_message("Please enter a valid number");
        printf("Enter number : ");
        scanf("%s",c.number);
    }
    fp=fopen("tel.txt","a");
    if ( fp == NULL )
    {
        printf( "Error" );
    } else {
        fprintf(fp, "%d. %s %s \n", total_contact+1,c.name, c.number);
        printf("-------------------------------------------\n");
        printf("****** Successfully created contact. ******\n");
        printf("***** Name : %s | Number : %s *****\n",c.name,c.number);
        printf("-------------------------------------------\n");
    }
    fclose(fp);
}
void delay(int milliseconds){
    long pause;
    clock_t now,then;
    pause = milliseconds*(CLOCKS_PER_SEC/1000);
    now = then = clock();
    while( (now-then) < pause )
        now = clock();
}
