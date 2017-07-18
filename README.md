###git 命令

###1.git add read.txt
```
	添加一个文件到暂存区.会和暂存区的文件合并
	git add read.txt
```

###2.git status
```
	查看当前工作区的文件的状态，就是检查出当前工作区文件的状态和暂存区以及分支的状态的区别
	git status
```

###3.git commit -m "description"
```
	将暂存区的文件提交到分支
	git commit -m'这里写对这次提交内容的讲解，方便别人阅读代码‘
```

###4.git reset --hard commitId /(HEAD~n/HEAD^)
```
	从版本库中的master分支中 获取版本覆盖掉当前工作区的内容
	git reset --hard commitid或者HEAD^
	git reset --hard HEAD~100 回退前100次
	在命令行窗口未清空的情况下还可以回到未来版本 只要知道版本id
```

###5.git log --pretty=oneline
```
	展示出版本库中master分支的所有历史提交记录。
	git log
	git log --pretty=oneline 添加参数使输出清晰
```

###6.git reflog
```
	展示出版本库中master分支的所有提交和回滚记录 第一列是版本id
	git reflog
	根据现实的版本id就可以回退到任何版本
```

###7.git checkout -- read.txt
```
	将对工作区文件的修改，还未提交到暂存区的修改废弃掉 
	如果已经提交到了暂存区，使用git checkout -- <file>命令无法废弃暂存区的修改 
	对工作区的修改和删除都可以恢复
	git checkout -- read.txt

	一种是read.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
	一种是read.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
	保存到暂存区，未保存到暂存区的内容会丢失
	git cheackout 实际上是用版本库中的版本替换工作区的版本
```


###8.git reset HEAD <file>
```
	将提交到暂存区的记录废弃 
	git reset HEAD <file> 将add到暂存区中，但未commit的记录废弃
```


###9.git rm <files>
```
	rm 命令将工作区的文件可以删掉
	git rm <files>可以将提交到git版本库中的文件删除掉
	也可以使用git checkout -- <files>将对工作区的操作废弃，即可以将在工作区删除的文件重新恢复以保证工作区和git版本库中的状态一致
```


###10.git diff HEAD -- read.txt
```
	用命令可以查看工作区和版本库里面最新版本的区别：
	git diff HEAD -- read.txt
```


###11.git remote add origin
```
	将本地版本库与远程数据库关联起来
	git remote add origin  http连接或者ssh连接
```

###12.git push (-u) origin master
```
	把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
	git push (-u) origin master
	由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
```


###13.git checkout -b 分支名
```
	新建一个分支 如果它不存在的话，然后切换到新分支
	git checkout -b 分支名 (-b表示创建分支，命令也可以拆开写)
	相当于
	git branch 分支名
	git checkout 分支名
```

	master是一个主分支，默认HEAD指向master。当新建一个分支，就是新建一个指针，然后把HEAD指向新分支。

###14.git merge 分支名 
```
	将当前分支与分支名这个分支的版本合并，就是说把当前分支的指针改到分支名这个分支指向的位置。
```

###15.总结分支的用法
```
	Git鼓励大量使用分支：

	查看分支：git branch

	创建分支：git branch <name>

	切换分支：git checkout <name>

	创建+切换分支：git checkout -b <name>

	合并某分支到当前分支：git merge <name>

	删除分支：git branch -d <name>
```


###16.
```
	当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

	冲突一般是发生在两个工作区a,b都做了修改，且都提交到版本库了，这个时候a工作区要执行merge操作就会出现。

	用git log --graph命令可以看到分支合并图。
```

###17.程序员要做的一般就是下面这几个步骤
```
	a.每天都将远程仓库中的内容拉取到本地，最好是新建一个分支来接收
	这个例子的意思是把远程仓库的master分支拉取到本地，并放到temp分支下

	git fetch origin master:temp 

	b.将自己的代码一般是在master分支中的代码与temp 对比
	git diff temp

	c.如果没有问题就合并
	git merge temp

	d.然后把temp分支删除
	git branch -d temp

	e.自己在master或者现在别的分支 test 里面一顿敲代码.....
	git checkout test
	f.然后要下班的时候，确认没问题后把test里面的代码和master里面的合并
	git checkout master
	git merge test

	g.最后把自己今天的工作内容也就是master里面的代码推到远程仓库分支linmingjob，让项目经理去合并
	git push origin linmingjob

```






