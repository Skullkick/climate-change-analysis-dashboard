# Climate Change Analysis Dashboard  

## Overview  
The **Climate Change Analysis Dashboard** is a comprehensive project designed to analyze, process, and visualize climate change data. It includes data cleaning, trend analysis, and predictive modeling, with results displayed in an interactive web-based dashboard.  

## Features  
- **Raw Data Processing**: Cleans and formats climate-related datasets.  
- **Predictive Modeling**: Uses machine learning models to forecast climate trends.  
- **Interactive Dashboard**: Displays processed data and visualizations via a web interface.  
- **Docker Support**: Includes a `Dockerfile` for containerized deployment.  

## Project Structure  
```
CLIMATE CHANGE ANALYSIS/
├── README.md               # Documentation  
├── requirements.txt        # Python dependencies  
├── data/                   # Data storage  
│   ├── raw/                # Original datasets  
│   ├── cleaned/            # Cleaned datasets  
│   ├── formatted/          # Reformatted datasets  
│   ├── processed/          # Processed data for visualization  
│   ├── predictions/        # Model prediction outputs  
├── frontend/               # Web-based dashboard  
│   ├── index.html          # Main HTML file  
│   ├── script.js           # JavaScript logic  
│   ├── styles.css          # Stylesheet  
│   ├── assets/             # Static assets (images, etc.)  
│   ├── public/data/        # JSON & CSV files for visualization  
│   ├── Dockerfile          # Docker support  
├── scripts/                # Data processing and model scripts  
│   ├── analysis/           # Data trend analysis scripts  
│   ├── data_preparation/   # Data cleaning and formatting scripts  
│   ├── models/             # Model training and predictions  
│   ├── json_to_csv.py      # Conversion utility  
└── directory_tree.py       # Script to generate project structure  
```  

## Setup & Usage  

### 1. Clone the Repository  
```bash
git clone https://github.com/Skullkick/climate-change-analysis-dashboard.git
cd climate-change-analysis-dashboard
```  

### 2. Install Dependencies  
Ensure you have Python installed, then install required libraries:  
```bash
pip install -r requirements.txt
```  

### 3. Download Datasets  
Before running data processing scripts, download the necessary datasets:  
- **CO₂ Data:** [NOAA CO₂ Monthly Data](https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv)  
- **Temperature Data:** [NASA GISTEMP Data](https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv)  
- **Sea Level Data:** [IMF Climate Data](https://climatedata.imf.org/datasets/b84a7e25159b4c65ba62d3f82c605855_0/explore)  
- **Deforestation Data:** [Global Forest Watch](https://www.globalforestwatch.org/dashboards/global/)  

### 4. Run Data Processing Scripts  
Execute the necessary scripts to clean and format data:  
```bash
python scripts/data_preparation/data_cleaning.py
python scripts/data_preparation/co2_data_formatting.py
python scripts/data_preparation/sea_level_format.py
python scripts/analysis/trend_analysis.py
```  

### 5. Run Predictive Models  
Train models to generate climate predictions:  
```bash
python scripts/models/model_training.py
```  

### 6. Access the Dashboard  
Open `frontend/index.html` in a web browser to visualize the results.  

## Deployment (Docker)  
To run the dashboard in a container:  
```bash
docker pull ghcr.io/skullkick/climate-analysis-dashboard:latest
docker run -p 8080:80 climate-analysis-dashboard
```
Access the dashboard at `http://localhost:8080`.


## **Contributors**
- [Alluri Varun Reddy](https://github.com/varun240s)
- [K. Keerthi Sathvik](https://github.com/Skullkick)


