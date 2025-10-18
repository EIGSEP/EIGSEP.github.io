# EIGSEP Memos

See uploaded memos here: https://eigsep.github.io/

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone git@github.com:EIGSEP/EIGSEP.github.io.git
   cd EIGSEP.github.io

2. In Overleaf, create a new project and select "Upload Project". Use the `template.zip' file from this repo.

3. **Download the project**  
   In Overleaf, go to Menu > Download > Download as ZIP. This will download a file named after your project, e.g., `memo_lna.zip`.

4. **Add metadata**
For Jupyter Notebooks, click **Edit > Edit Notebook Metadata** in you Jupyter Notebook and type something like:
   ```bash
   "authors" : ["Charlie G. Tolley"],
   "tags" : ["Calibration", "Hardware"]
   ```

In the top level of the metadata JSON.

For latex memos, replace the relevant metadata in the comments at the top of the template. It should look something like:
% TITLE: Switches and VNA Software for Automation
% AUTHORS: Charlie G. Tolley, Jane Doe
% TAGS: VNA, Switching, Automation, Software
% SUMMARY: Overview of the automated control software...

4. **Put the downloaded Overleaf project in the memo folder**
   ```bash
   mv ~/Downloads/memo_lna memos/

5. **Push the changes**. For review, you can checkout a new branch first:
   ```bash
    git checkout -b your-branch-name
    ```
    
    Then add the new memo to the repo:
   ```bash
   git add memos/memo_lna
   git commit -m "initial commit"
   git push
   ```
   
   You can also upload a Jupyter Notebook directly:
   ```bash
   cp path/to/your-notebook.ipynb notebooks/
   git add notebooks/your-notebook.ipynb
   git commit -m "initial commit"
   git push
   ```
   

6. **Create a pull request**  
   Go to the GitHub repository and create a pull request from your branch to the main branch. This will allow others to review your changes before merging them into the main branch.
