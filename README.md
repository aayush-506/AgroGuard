# AgroGuard: Plant-based Disease Detection System

AgroGuard is an innovative deep-learning-based application designed to identify various diseases affecting plants. By leveraging advanced image processing techniques, it swiftly detects diseases, enabling timely intervention to protect crops. AgroGuard not only identifies diseases but also provides comprehensive information on cures, prevention strategies, and treatments, empowering users to take proactive measures to safeguard their crops.

## Key Features

-   **Disease Identification:** Utilizes YOLO (You Only Look Once) for precise and efficient detection of plant diseases from images.
-   **Comprehensive Information:** Offers detailed insights into identified diseases, including recommended cures, prevention methods, and treatments.
-   **User-Friendly Interface:** Intuitive and easy-to-use interface developed using React for seamless interaction with the application.
-   **Scalable Backend:** Powered by Node.js and Express, ensuring robustness and scalability in handling user requests and data processing.
-   **API Integration:** Flask API facilitates seamless communication between the image processing module and the Node.js server.

## Technologies Used

-   **Python:** YOLO is implemented for image processing tasks.
-   **Node.js and Express:** Backend server development for handling user requests and data processing.
-   **React:** Frontend development for creating an interactive and user-friendly interface.
-   **Flask:** API development to connect the image processing module with the Node.js server.

## Installation

1. **Clone the Repository:**
    ```
    git clone https://github.com/sachin-acharya-projects/AgroGuard.git
    ```
2. **Navigate to the Project Directory:**
    ```
    cd AgroGuard
    ```
3. **Install Dependencies:**
    - Backend:
        ```PowerShell
        cd Backend
        npm install
        ```
    - Frontend:
        ```PowerShell
        cd Frontend
        npm install
        ```
    - Machine-Learning
        ```PowerShell
        cd Machine-Learning
        pip install -r requirements.txt
        ```
4. **Run the Application:**
    - Backend:
        ```PowerShell
        cd Backend
        npm start # npm run dev for development server
        ```
    - Frontend:
        ```PowerShell
        cd frontend
        npm start
        ```
    - Machine-Learning
        ```PowerShell
        python main.py
        ```

## Usage

1. **Upload Images:** Upload images of plants with suspected diseases.
2. **View Results:** AgroGuard will swiftly process the images and provide information on identified diseases along with recommended actions.
3. **Take Action:** Based on the provided insights, take necessary actions such as applying cures, implementing prevention measures, or treatments to protect your crops.

## AgroGuard Contributor

-   [**Sachin Acharya**](https://github.com/sachin-acharya-projects)
-   [**Sahas Timilsina**](https://github.com/Sahas001)
-   **Aviket Gurung**
-   **Prasiddha Sharma**

## Contributing

Contributions to AgroGuard are welcome! Here's how you can contribute:

-   Fork the repository.
-   Create a new branch.
-   Make your contributions.
-   Submit a pull request.

<!-- ## License

This project is licensed under the [MIT License](LICENSE). -->

## Acknowledgements

-   Special thanks to the developers and contributors of YOLO, Node.js, Express, React, and Flask for their invaluable contributions to the open-source community.
