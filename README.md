# cardgame
# Testing can be done by calling the function "checkWinner"
# send an array of arrays which is supposed to be the cards dealed.
# For example :
# array = [[2,3,4,10],[3,4,14,2], [3,3,3,4], [2,4,2,5]] is the input, First array is cards dealed for player A, second array is input for player B and so on; 
# If there is a tie for any kind of winning sequence (whether it is trail, sequence, two cards,high card), then we check the remaining cards as well
# If then if tie happens, then we are dealing one additional card to all the people with tie.
# It continues till we get the winner