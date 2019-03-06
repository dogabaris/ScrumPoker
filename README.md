# TrendyolCase

## Kurulum

frontend-app klasöründe açılan terminalde

```bash
npm i
```

komutuyla node paketlerinin yüklenmesi gerekmektedir.

Angular frontend kodlarının .net tarafında bir kez güncellenmesi için

```bash
ng build --deploy-url /angular/libs/
```

komutu çalıştırılmalıdır.

Angular frontend kodlarının .net tarafında kod geliştirme sırasında güncellenmesi için

```bash
ng build --deploy-url /angular/libs/ --watch
```

komutu çalıştırılmalıdır.

IIS sunucu/proje run edilmelidir.

## Linkler

Session ve storyleri oluşturmak için;

```bash
localhost(:port)/poker-planning-add-story-list
```

Scrum Master'ın session/storyleri oluşturduktan sonra yönlendirildiği link;

```bash
localhost(:port)/poker-planning-view-as-scrummaster/:sessionName
```

Developerlar ile paylaşılan link;
```bash
localhost(:port)/poker-planning-view-as-developer/:sessionName
```
