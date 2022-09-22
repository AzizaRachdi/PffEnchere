

from datetime import datetime,timedelta
from itertools import product
from django.conf import settings
from django.db import models,transaction
from django.contrib.auth.models import AbstractUser



# Create your models here.

class Category(models.Model):
    
    categoryName=models.CharField(max_length=20,null=False)
    duration=models.IntegerField(null=False)
    active = models.BooleanField(default=True)
    image=models.ImageField(upload_to='',null=True)
    @transaction.atomic
    def disable(self):
        if self.active==False:
            return
        self.active=False
        self.save()
        self.products.update(active=True)

    def __str__(self):
        return self.categoryName
    
class User(AbstractUser):
    
    first_name=models.CharField(max_length=20,null=False)
    last_name=models.CharField(max_length=20,null=False)
    is_active=models.BooleanField(default=True)
    phone=models.IntegerField(null=True)
    email=models.EmailField(null=False)
    username=models.CharField(max_length=50,null=False,unique=True)
    password = models.CharField(max_length=128)
    age=models.IntegerField(null=True)
    active = models.BooleanField(default=True)
    solde=models.FloatField(default=0)
    photo=models.ImageField(upload_to='',null=True)
    genre=models.CharField(max_length=150,choices=[('MALE','MALE'),('FEMALE','FEMALE')],default='MALE')
    companie=models.CharField(max_length=150,null=True)
    
    @transaction.atomic
    def disable(self):
        if self.active==False:
            return
        self.active=False
        self.save()
        self.products.update(active=False)
        self.propositions.update(active=False)
    @transaction.atomic
    def is_admin(self):
        if self.is_superuser:
            return True
        return False
    @transaction.atomic
    def activate(self):
        if self.active==True:
            return
        self.active=True
        self.save()
        
    
    
        
    def is_active(self):
        return self.active

    
    def __str__(self):
        return self.username
       
class Product(models.Model):
    
    productName=models.CharField(max_length=20,null=False)
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='products')
    owner=models.ForeignKey(User,on_delete=models.CASCADE,related_name='products')
    description=models.TextField(null=False)
    image=models.ImageField(upload_to='')
    state=models.CharField(max_length=150,choices=[('NEW','NEW'),('OLD','OLD')],null =True)
    active=models.BooleanField(default=True)
    availble=models.BooleanField(default=False)
    
    @transaction.atomic
    def disable(self):
        if self.active==False:
            return
        self.active=False
        self.offers.update(etat='DISABLED')
        self.save()
        
    def is_active(self):
        return self.active

    def __str__(self) :
        return "${self.id}"



    
    

    
class Offre(models.Model):
    
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='offers')
    price=models.FloatField(null=False)
    startDate=models.DateTimeField(null=False,default=datetime.now())
    endDate=models.DateTimeField(null=True)
    etat=models.CharField(choices=[('DISABLED','DISABLED'),('ACTIVE','ACTIVE'),('PENDING','PENDING'),('APPROVED','APPROVED'),('COMPLETED','COMPLETED')], max_length=50,default='PENDING')
    checked=models.BooleanField(default=False)
    buyer=models.ForeignKey(User,on_delete=models.CASCADE,related_name='offers',null=True)
    def save(self, *args, **kwargs):
        categ=self.product.category
        if self.propositions == None:
          self.buyer=self.product.owner
        self.endDate = self.startDate + timedelta(days=categ.duration)
        super(Offre, self).save(*args, **kwargs) # Call the "real" save() method.
    @transaction.atomic
    def finalcheck(self):
        if self.check==True:
            return
        prod=Product.objects.get(id=self.product.id)
        buyer=User.objects.get(id=prod.owner.id)
        soldes=buyer.solde+self.price
        seller=User.objects.get(id=prod.owner.id)
        seller.solde=soldes
        seller.save()
        
        self.checked=True
        self.save()
   
        
                
    @transaction.atomic
    def active(self):
        if self.etat=='ACTIVE':
            return
        
        self.etat='ACTIVE'
        self.startDate=datetime.now()
        self.save()
    def disable(self):
        if self.etat=='DISABLED':
            return
        self.etat='DISABLED'
        self.endDate=datetime.now()
        self.save()
        self.propositions.update(active=False)

    def __str__(self):
        return "${self.id}"
    
    
class Proposition(models.Model):
    
    price=models.FloatField(null=False)
    date=models.DateTimeField(null=False,default=datetime.now())
    offre=models.ForeignKey(Offre,on_delete=models.CASCADE,related_name='propositions')
    client=models.ForeignKey(User,on_delete=models.CASCADE,related_name='propositions')
    has_return=models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    @transaction.atomic
    def disable(self):
        if self.active==False:
            return
        self.active=False
        self.save()
        self.products.update(active=False)

    def __str__(self):
        return "${self.date}"


class Comments(models.Model):
    owner=models.ForeignKey(User,on_delete=models.CASCADE,related_name='comments')
    offer=models.ForeignKey(Offre,on_delete=models.CASCADE,related_name='comments')
    date=models.DateTimeField(null=False,default=datetime.now())
    comment=models.TextField(max_length=2000,null=False)
    active=models.BooleanField(default=True)
    @transaction.atomic
    def disable(self):
        if self.active==False:
            return
        self.active=False
        self.save()
    def __str__(self):
        return self.comment
    
class Notification(models.Model):
    responsible=models.ForeignKey(User,on_delete=models.CASCADE,related_name='notif',default=0)
    to_who=models.ForeignKey(User,on_delete=models.CASCADE,related_name='notifications')
    subject=models.CharField(max_length=300,null=False)
    is_Readed=models.BooleanField(default=False)
    date=models.DateTimeField(default=datetime.now())
    active=models.BooleanField(default=True)
    @transaction.atomic
    def disable(self):
        if self.active==False:
            return
        self.active=False
        self.save()
    @transaction.atomic
    def read(self):
        if self.is_Readed==True:
            return
        self.is_Readed=True
        self.save()
        
    
    
    def __str__(self):
        return self.object
    
    