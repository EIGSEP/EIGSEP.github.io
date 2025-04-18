# EIGSEP Memos

See uploaded memos here: https://eigsep.github.io/

Use the template in the [template repo](https://github.com/EIGSEP/EIGSEP-Memo-Templates). In Overleaf, you can use the "Import from Github" option. When that's done, download the whole project to your computer and save it to a folder.


## Adding a New Memo

1. **Clone the repo**  
   ```bash
   git clone git@github.com:EIGSEP/EIGSEP.github.io.git
   cd EIGSEP.github.io
2. **Put the downloaded Overleaf project in the memo folder**
   ```bash
   mv ~/Downloads/memo_lna memos/
3. **Push the changes**
   ```bash
   git add memos/memo_lna
   git commit -m "initial commit"
   git push

You can also upload a pdf of a Jupyter Notebook directly:
```bash
cp path/to/your-notebook.pdf notebooks/
git add notebooks/your-notebook.pdf
git commit -m "initial commit"
git push

