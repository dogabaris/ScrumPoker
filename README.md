# ScrumPoker

## Kurulum

- frontend-app klasöründe açılan terminalde

```bash
npm i
```

komutuyla node paketlerinin yüklenmesi gerekmektedir.

```bash
npm i -g @angular/cli
```
komutuyla angular cli'ının global yüklenmesi sağlanarak istenilen yerde angular buildleri yapılır hale getirilmelidir.

- Angular frontend javascript kodlarının .net tarafında güncellenmesi için

```bash
ng build --deploy-url /angular/libs/
```

komutu çalıştırılmalıdır.

- TrendyolCase klasöründe olması gereken .net'in packages klasörü yani nuGet Paketleri'nin indirilmesi için proje visual studio ile açılıp otomatik olarak indirilmesi sağlanmalıdır. 

- Visual Studio'da yukarıdaki işlemler yapıldığında IIS sunucu/proje run edilmelidir.

- Angular frontend kodlarının .net tarafında kod geliştirme sırasında güncellenmesi için

```bash
ng build --deploy-url /angular/libs/ --watch
```

komutu çalıştırılabilir, zorunlu değildir.

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
