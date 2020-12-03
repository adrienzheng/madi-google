// this file contains all the static values
import React from 'react'

export const threshholdText = "This threshold slider filters out transactions with an anomalous score below your selected value. The closer the score is to 1, the more anomalous a transaction is considered to be.  Consider values below the selected value the amount of risk you’re willing to let pass automatically."

export const aboutMadiText = [
  "In Sipple 2020 (link paper here), the authors propose a scalable, unsupervised approach for detecting anomalies that creates a negative sample from the positive, observed sample, and trains a classifier to distinguish between positive and negative samples. Using the Concentration Phenomenon, they explain why such a classifier ought to establish suitable decision boundaries between normal and anomalous regions, and show how Integrated Gradients can attribute the anomaly to specific dimensions within the anomalous state vector. They have demonstrated that negative sampling with random forest or neural network classifiers yield significantly higher AUC scores compared to state-of- the-art approaches against benchmark anomaly detection datasets, and a multidimensional, multi- modal dataset from real climate control devices.",
  "For this dashboard, MADI was applied to the IEEE-CIS Fraud Detection dataset (link kaggle page here). The IEEE-CIS fraud detection dataset is a benchmark dataset consisting of 590,540 rows and 434 columns in its train datset and 506,691 rows and 433 columns in its test datset. In total, the dataset consists of 1,097,231 multidimensional, multimodal observations that come from real-world e-commerce transactions collected over 6 months and contains a wide range of features from device type to product features."
]

export const aucText = [
  "NS-NN (Negative Sampling Neural Network) and NS-RF (Negative Sampling Random Forest) are the negative sampling classifiers used in MADI. You can see their performance as AUC/ROC Curves in comparison with other prominent anomaly detectors like OC-SVM (One-Class SVM) and ISO (Isolation Forest).",
  "Click on a layer to the left to explore the true positive vs. false positive rates of the different classifiers at different classification thresholds."
]

export const madiText = "MADI is a novel unsupervised anomaly detection approach. Here it is applied to the IEEE-CIS dataset, a benchmark anomaly detection dataset sourced from real world e-commerce transactions. This dashboard highlights MADI’s interpretability: For each individual transaction, the factors that contribute to its assigned anomaly likelihood score are elucidated." 