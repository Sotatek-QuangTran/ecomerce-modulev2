source /opt/ros/foxy/setup.bash
cd /home/sotatek/ros2_ws
. install/setup.bash
ros2 launch dsr_launcher2 single_robot_rviz.launch.py model:=a0912 color:=blue